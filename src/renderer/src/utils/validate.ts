const SupportVersion = "3.3.2";

//验证版本
export const validateVersion = (version: string) => {
  if (version == SupportVersion) {
    return true;
  }

  const v1 = SupportVersion.split(".");
  const v2 = version.split(".");

  for (let i = 0; i < 3; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 < num2) {
      return true;
    }
  }

  return false;
};
