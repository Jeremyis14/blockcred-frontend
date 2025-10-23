export default function Loading() {
  return (
    <div className="loader-overlay">
      <div className="loader-inner">
        <div className="reveal-mask">
          <img
            src="/darkicon.png"
            alt="Blockcred dark logo"
            style={{ width: 140, height: "auto", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
