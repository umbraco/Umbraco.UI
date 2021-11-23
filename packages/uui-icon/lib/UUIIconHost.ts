export class UUIIconHost {
  public readonly promise: Promise<string>;
  private readonly resolve!: Function;
  public readonly reject!: Function;

  public preventDefault = true;

  constructor(svg?: string) {
    this.promise = new Promise<string>((resolveMethod, rejectMethod) => {
      (this as any).resolve = resolveMethod; // Intentionally skipping type checking as we want to be able to set the method in this line.
      (this as any).reject = rejectMethod; // Intentionally skipping type checking as we want to be able to set the method in this line.
    });

    if (svg) {
      this.resolve(svg);
    }
  }

  public set svg(svg: string) {
    this.resolve(svg);
  }
}
