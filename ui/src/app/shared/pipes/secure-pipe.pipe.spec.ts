import { SecurePipe } from "./secure-pipe.pipe";

describe("SecurePipePipe", () => {
  it("create an instance", () => {
    const pipe = new SecurePipe();
    expect(pipe).toBeTruthy();
  });
});
