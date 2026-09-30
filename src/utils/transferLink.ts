/** Links contain only a transfer ID; access and decisions remain in the app. */
export function parseTransferLandingPath(path: string): string | null {
  const match = /^\/transfer\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i.exec(path);
  return match ? match[1].toLowerCase() : null;
}
export function transferNativeUrl(id: string): string | null {
  const validated = parseTransferLandingPath(`/transfer/${id}`);
  return validated ? `hflsoccerapp://transfers/${validated}` : null;
}
