const useResponse = (res) => {
  const badJson = (message, code = 400, obj = {}) => {
    if (typeof message === "number") {
      return res.sendStatus(message);
    }

    let error;

    if (typeof message === "string" || typeof message === "number") {
      error = { message, ...obj };
    } else if (Array.isArray(message)) {
      if (Object.keys(obj).length > 0) {
        error = { data: message, ...obj };
      } else {
        error = message;
      }
    } else if (message && typeof message === "object") {
      error = { ...message, ...obj };
    }

    res.status(typeof message === "number" ? message : code).json({
      status: false,
      error
    });
  };

  const goodJson = (message, code = 200, obj = {}) => {
    if (typeof message === "number") {
      return res.sendStatus(message);
    }
    let data;
    if (typeof message === "string" || typeof message === "number") {
      data = { message, ...obj };
    } else if (Array.isArray(message)) {
      if (Object.keys(obj).length > 0) {
        data = { data: message, ...obj };
      } else {
        data = message;
      }
    } else if (message && typeof message === "object") {
      data = { ...message, ...obj };
    }

    res.status(typeof message === "number" ? message : code).json({
      status: true,
      data
    });
  };

  return { badJson, goodJson };
};

export default useResponse;
