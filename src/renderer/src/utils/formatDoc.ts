import Doc from "@/../../../release-note.md?raw";

export const formatDoc = () => {
  const res: {
    name: string;
    data: string[];
  }[] = [];
  const versionRegex = /## (\S+)\s+([\s\S]*?)(?=## |\n*$)/g;
  let match;

  while ((match = versionRegex.exec(Doc)) !== null && res.length <= 10) {
    const version = match[1];
    const content = match[2].trim();

    const updates = content
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    res.push({
      name: version,
      data: updates,
    });
  }

  return res;
};
