export default function MessageBar({ message }) {
    return (
        <div className="message-bar">
            {message && <div className="message">{message}</div>}
        </div>
    );
}