import notFound from '../../assets/images/404.png';

export default function NotFound() {
  return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <img height={350} className="w-75 rounded" src={notFound} alt="Not Found" />
        </div>
      </div>
  );
}
