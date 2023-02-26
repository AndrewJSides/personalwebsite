interface SquareProps {
  text: string;
}

const Square = (props: SquareProps) => {
  const { text } = props;
  return (
    <div
      onClick={() => console.log("Clicked Square")}
      className="cursor-pointer square"
      draggable={true}
    >
      <div className="w-32 h-32 rounded-lg border-2 border-black">
        Square {text}
      </div>
    </div>
  );
};

export default Square;
