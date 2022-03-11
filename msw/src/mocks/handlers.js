import { rest } from "msw";

export const handlers = [
  rest.get("/login", async (req, res, ctx) => {
    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),
  rest.get("", async (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          people: [
            {
              name: "jimmy",
              age: 135,
            },
            {
              name: "timmy",
              age: 13,
            },
            {
              name: "cindy",
              age: 15,
            },
            {
              name: "judy",
              age: 25,
            },
            {
              name: "marry",
              age: 64,
            },
            {
              name: "tommy",
              age: 109,
            },
          ],
        },
      })
    );
  }),
];
