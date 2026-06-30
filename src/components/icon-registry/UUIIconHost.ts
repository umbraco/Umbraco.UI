export class UUIIconHost {
  public readonly promise: Promise<string>;
  private readonly resolve!: (value: string) => void;
  public readonly reject!: (reason?: unknown) => void;

  constructor(svg?: string) {
    this.promise = new Promise<string>((resolveMethod, rejectMethod) => {
      (this as any).resolve = resolveMethod;
      (this as any).reject = rejectMethod;
    });

    if (svg) {
      this.resolve(svg);
    }
  }

  public set svg(svg: string) {
    this.resolve(svg);
  }
}
