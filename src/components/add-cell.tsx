import { useActions } from "../hooks/use-actions";
import "./add-cell.css";

interface AddCellProps {
  previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId: nextCellId }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default AddCell;