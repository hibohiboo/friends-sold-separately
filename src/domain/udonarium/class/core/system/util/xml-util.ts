/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-inner-declarations */
export namespace XmlUtil {
  const encodePattern = /&|<|>|"|'/g;
  const encodeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };

  const decodePattern = /&amp;|&lt;|&gt;|&quot;|&apos;/g;
  const decodeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
  };

  // eslint-disable-next-line no-control-regex
  const sanitizePattern =
    /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

  export function xml2element(xml: string): HTMLElement | null {
    const domParser: DOMParser = new DOMParser();
    let xmlDocument: Document | null = null;
    try {
      xml = sanitizeXml(xml);
      xmlDocument = domParser.parseFromString(xml, 'application/xml');
      const parsererror = xmlDocument.getElementsByTagName('parsererror');
      if (parsererror.length) {
        console.error('XMLのパースに失敗しました', xmlDocument.documentElement);
        xmlDocument = null;
      }
    } catch (error) {
      console.error(error);
    }
    return xmlDocument ? xmlDocument.documentElement : null;
  }

  export function encodeEntityReference(string: string): string {
    return string.replace(encodePattern, encodeReplacer);
  }

  export function decodeEntityReference(string: string): string {
    return string.replace(decodePattern, decodeReplacer);
  }

  function sanitizeXml(xml: string): string {
    return xml.replace(sanitizePattern, '').trim();
  }

  function encodeReplacer(char: string): string {
    return encodeMap[char as keyof typeof encodeMap];
  }

  function decodeReplacer(entity: string): string {
    return decodeMap[entity as keyof typeof decodeMap];
  }
}
