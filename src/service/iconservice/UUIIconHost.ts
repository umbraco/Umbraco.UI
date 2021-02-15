export class UUIIconHost {
  public promise: Promise<string>;
  private resolve!: Function;
  public reject!: Function;

  constructor(svg?: string) {
    this.promise = new Promise<string>((resolveMethod, rejectMethod) => {
      this.resolve = resolveMethod;
      this.reject = rejectMethod;
    });

    if (svg) {
      this.resolve(svg);
    }
  }

  public set svg(svg: string) {
    this.resolve(svg);
  }
}
