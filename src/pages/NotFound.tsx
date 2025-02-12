import StatusPage from "./StatusPage";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <StatusPage
      status="404"
      title="Not Found"
      description="The page you are looking for does not exist."
      action="Go back"
      onActionClick={() => navigate(-1)}
    />
  );
}

export default NotFound;
