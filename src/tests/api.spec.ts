import {
  apiGetAlltodos,
  apiPostData,
  apiPutData,
  apiDeleteData,
} from "../api/sample";

beforeAll(() => {
  console.log("開始測試API");
});
afterAll(() => {
  console.log("測試API結束");
});

// describe 每個都是獨立的
describe("api", () => {
  let count = 0;
  beforeEach(() => {
    count++;
    console.log(`第${count}次測試API`);
  });

  afterEach(() => {
    console.log(`第${count}次測試API結束`);
  });
  // it.only(只執行這個測試)(vitest 套件案旁邊就好)
  it("apiGetAlltodos", async () => {
    // expect.assertions(1); //必須執行1次
    try {
      const res = await apiGetAlltodos();
      expect(res.status).toBe(200);
    } catch (error: any) {
      expect(error.message.includes("ENOTFOUND")).toBe(true);
    }
  });
  it("apiPostData", async () => {
    const res = await apiPostData({
      id: 1,
      title: "it",
      completed: true,
      userId: 1,
    });
    expect(res.status).toBe(201);
  });
  it("apiPutData", async () => {
    const res = await apiPutData(1, {
      id: 1,
      title: "it",
      completed: true,
      userId: 1,
    });
    expect(res.status).toBe(200);
  });
  it("apiDeleteData", async () => {
    // resolves 等於 response
    // await expect(apiDeleteData(1)).resolves.toMatchObject({
    //   status: 200,
    // });

    const res = await apiDeleteData(1);
    expect(res.status).toBe(200);
  });
});
