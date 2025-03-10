
  
export default function CategoryItem({ category, onSelectCategory }) {
  return (
    <div className="col-md-3">
      <div
        className="card shadow-sm p-3 text-center border-0 rounded-3 bg-light"
        style={{ cursor: "pointer", transition: "0.3s" }}
        onClick={() => onSelectCategory(category._id)} 
      >
        <div className="card-body">
          <h5 className="text-primary fw-bold text-uppercase">{category.name}</h5> 
        </div>
      </div>
    </div>
  );
}

