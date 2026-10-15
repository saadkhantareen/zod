import { expect, test } from "vitest";
import { z } from "../../../../index.js";
import hy from "../../../locales/hy.js";

test("Armenian locale - single-value invalid_value shows the expected value", () => {
  z.config(hy());

  const literalResult = z.literal("a").safeParse("b");
  expect(literalResult.success).toBe(false);
  if (!literalResult.success) {
    expect(literalResult.error.issues[0]!.message).toBe(`Սխալ մուտքագրում․ սպասվում էր "a"`);
  }

  const enumResult = z.enum(["only"]).safeParse("x");
  expect(enumResult.success).toBe(false);
  if (!enumResult.success) {
    expect(enumResult.error.issues[0]!.message).toBe(`Սխալ մուտքագրում․ սպասվում էր "only"`);
    expect(enumResult.error.issues[0]!.message).not.toContain("undefined");
  }
});
