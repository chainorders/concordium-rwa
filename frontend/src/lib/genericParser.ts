import { SchemaType, deserializeSchemaType } from "@concordium/web-sdk";
import { Buffer } from "buffer/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parse = (json: any, schemaBase64: string): any => {
	const schemaType = deserializeSchemaType(Buffer.from(schemaBase64, "base64"));
	return parseSchemaType(json, schemaType);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSchemaType = (json: any, type: SchemaType): any => {
	console.log("parsing", type, json);
	switch (type.type) {
		case "Struct": {
			switch (type.fields.type) {
				case "None":
					return {};
				case "Named": {
					const ret = {} as Record<string, unknown>;
					for (const field of type.fields.fields) {
						ret[field.name] = parseSchemaType((json as Record<string, unknown>)[field.name], field.field);
					}

					return ret;
				}
				case "Unnamed": {
					const ret = [] as unknown[];
					for (const field of type.fields.fields) {
						ret.push(parseSchemaType((json as unknown[])[ret.length], field));
					}

					return ret;
				}
			}
			break;
		}
		case "Enum": {
			const variantType = type.variants.find((variant) => variant.name === json.tag)!;
			const variantValue = json[json.tag];
			const ret = { [json.tag]: parseSchemaType(variantValue, { type: "Struct", fields: variantType.fields }) };
			console.log("parsed-enum", ret, "from", variantValue, "with", variantType.fields);
			return ret;
		}
		case "Pair": {
			return [parseSchemaType(json.first, type.first), parseSchemaType(json.second, type.second)];
		}
		case "List": {
			return json.map((item: unknown) => parseSchemaType(item, type.item));
		}
		case "Set": {
			return json.map((item: unknown) => parseSchemaType(item, type.item));
		}
		case "Array": {
			return json.map((item: unknown) => parseSchemaType(item, type.item));
		}
		case "Map": {
			const value = json as [unknown, unknown][];
			const ret = [];
			for (const [key, val] of value) {
				ret.push([parseSchemaType(key, type.key), parseSchemaType(val, type.value)]);
			}

			return ret;
		}
		case "TaggedEnum": {
			const variants = Array.from(type.variants.values()!);
			const variantValue = json[json.tag];
			return parseSchemaType(variantValue, { type: "Enum", variants });
		}
		default:
			return json;
	}
};
