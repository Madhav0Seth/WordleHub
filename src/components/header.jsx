export default function Header() {
    return (
        <div className="header">
            <div className="logo-line">
                <div className="logo-mark">
                    {[..."cpaapcaac"].map((t, i) => (
                        <div key={i} className={`logo-cell ${t}`} />
                    ))}
                </div>

                <div className="title">WORDLE</div>
            </div>

            <div className="subtitle">guess the five-letter word</div>
            <div className="divider" />
        </div>
    );
}