export class Url {
  static create(host: string, port: number, path: string = '/'): string {
    return host + ':' + port + path;
  }
}
