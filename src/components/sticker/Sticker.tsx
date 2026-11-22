export function Sticker({ text }: { text: string }) {
    return (
        <div className="slide-sticker">
            <span className="slide-sticker__text">{text}</span>
        </div>
    )
}
