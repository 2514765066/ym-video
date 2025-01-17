const SupportVersion = "3.3.2";

//验证版本
export const validateVersion = (version: string) => {
  const v1 = SupportVersion.split(".");
  const v2 = version.split(".");

  for (let i = 0; i < 3; i++) {
    const num1 = parseInt(v1[i]) || 0;
    const num2 = parseInt(v2[i]) || 0;

    if (num1 > num2) {
      return false;
    }
  }

  return true;
};
