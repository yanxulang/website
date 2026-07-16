import { docsUrl, sitePath } from "../lib";

export function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="shell not-found-layout">
        <div>
          <p className="eyebrow">404 · 页面未找到</p>
          <h1 id="not-found-title">这段路径没有对应页面。</h1>
          <p>链接可能已经移动，或地址中存在拼写错误。你可以返回官网首页，也可以直接进入文档继续查找。</p>
          <div>
            <a className="button-primary" href={sitePath()}>返回首页</a>
            <a className="button-secondary" href={docsUrl}>搜索文档</a>
          </div>
        </div>
        <div className="not-found-mark" aria-hidden="true">序</div>
      </div>
    </section>
  );
}
