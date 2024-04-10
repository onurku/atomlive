import checkSession from "helpers/auth/checkSession";

export default function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();
    console.log("apiHandler:", req.url);

    // check handler supports HTTP method
    if (!handler[method]) {
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`
      });
    }

    try {
      // global middleware
      // await jwtMiddleware(req, res);
      if (handler[method][1]) {
        //specify second param of true/false to check user session
        const isUserAuthenticated = await checkSession(req, res);
        if (isUserAuthenticated) {
          await handler[method][0](req, res);
        }
      } else {
        await handler[method][0](req, res);
      }

      // route handler
      // await handler[method](req, res);
    } catch (err) {
      // global error handler
      // errorHandler(err, res);
      // console.log(Object.keys(err));
      // console.log(JSON.stringify(err));
      console.log("GlobalApiHandler Err:", err);
      if (err.name && err.name === "SequelizeDatabaseError") {
        return res.status(400).json({
          success: false,
          message: "Please check your input parameters"
        });
      }
      return res.status(500).json(err);
    }
  };
}
