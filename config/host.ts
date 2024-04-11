import { dslog } from "ds-consolog";

const defaultDomain = ".joywok.com"
export const domainMap: { [key: string]: string } = {
  'dogesoft.joywok.com': '.joywok.com',
  'magicbox.hwwt2.com': '.hwwt2.com'
};

export const getDomain = (host: string): string => {
  dslog.info(`getDomain: ${host}`);
  if (host.includes('localhost')) {
    return 'localhost';
  } else {
    return domainMap[host] || defaultDomain;
  }
}