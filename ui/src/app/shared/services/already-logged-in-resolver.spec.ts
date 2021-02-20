import { TestBed } from "@angular/core/testing";

import { AlreadyLoggedInResolver } from "./already-logged-in-resolver";

describe("AlreadyLoggedInResolver", () => {
  let service: AlreadyLoggedInResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlreadyLoggedInResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
