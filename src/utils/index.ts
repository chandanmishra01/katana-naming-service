export const formatAddress = (account: string) => {
  const address = account;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
export const formatZetaName = (label: string) => {
  if (label?.split(".")?.length == 2) {
    if (label?.split(".")[0]!.length >= 8) {
      return `${label.slice(0, 4)}...${label.slice(-2)}`;
    }
    return `${label}`;
  }
  if (label?.length >= 8) {
    return `${label.slice(0, 4)}...${label.slice(-2)}`;
  }
  return label;
};

export const formatWrapedText = (
  label: string,
  startChar: number = 4,
  endChar: number = 6
) => {
  if (label?.split(".")?.length == 2) {
    if (label?.split(".")[0]!.length >= 8) {
      return `${label.slice(0, startChar)}...${label.slice(-endChar)}`;
    }
    return `${label}`;
  }
  if (label?.length >= 8) {
    return `${label.slice(0, startChar)}...${label.slice(-endChar)}`;
  }
  return label;
};

export const getDomainWitoutTld = (label: string) => {
  try {
    return label
      ?.split(".")
      ?.slice(0, -1)
      ?.toLocaleString()
      ?.replaceAll(",", ".");
  } catch (error) {
    console.log(`🚀 ~ file: index.ts:62 ~ error:`, error);
    return label;
  }
};

export const hexBytesToString = (input: string) => {
  let parsedInput = input;
  try {
    if (input.startsWith("0x")) {
      parsedInput = input.substring(2);
    }
    let buf = Buffer.from(parsedInput, "hex");
    let data = buf.toString("utf8");
    return data;
  } catch (error) {
    return input;
  }
};

export const gAevent = ({ action, category, label, value }: any) => {
  try {
    // @ts-ignore
    window?.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  } catch (error) {
    console.log(`index:71 ~ error:`, error);
  }
};

export function isAndroid(): boolean {
  return (
    typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)
  );
}

export function isSmallIOS(): boolean {
  return (
    typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent)
  );
}

export function isLargeIOS(): boolean {
  return (
    typeof navigator !== "undefined" &&
    (/iPad/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
  );
}

export function isIOS(): boolean {
  return isSmallIOS() || isLargeIOS();
}

export function isMobile(): boolean {
  return isAndroid() || isIOS();
}
