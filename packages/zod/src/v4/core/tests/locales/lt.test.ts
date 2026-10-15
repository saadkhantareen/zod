import { expect, test } from "vitest";
import { z } from "../../../../index.js";
import lt from "../../../locales/lt.js";

test("Lithuanian locale - too_big/too_small without a size unit does not append undefined", () => {
  z.config(lt());

  const tooBig = z.number().max(5).safeParse(9);
  expect(tooBig.success).toBe(false);
  if (!tooBig.success) {
    expect(tooBig.error.issues[0]!.message).toBe("Skaičius turi būti ne didesnis kaip 5");
  }

  const tooSmall = z.number().min(5).safeParse(1);
  expect(tooSmall.success).toBe(false);
  if (!tooSmall.success) {
    expect(tooSmall.error.issues[0]!.message).toBe("Skaičius turi būti ne mažesnis kaip 5");
  }

  const bigintTooBig = z.bigint().max(5n).safeParse(9n);
  expect(bigintTooBig.success).toBe(false);
  if (!bigintTooBig.success) {
    expect(bigintTooBig.error.issues[0]!.message).toBe("Sveikasis skaičius turi būti ne didesnis kaip 5");
  }

  const dateTooSmall = z.date().min(new Date(5)).safeParse(new Date(1));
  expect(dateTooSmall.success).toBe(false);
  if (!dateTooSmall.success) {
    expect(dateTooSmall.error.issues[0]!.message).not.toContain("undefined");
  }
});
