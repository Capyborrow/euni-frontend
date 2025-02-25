import StatusPage from "./StatusPage";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <StatusPage
      status="401"
      title="Unauthorized"
      description="You are not authorized to view this page."
      action="Go back"
      onActionClick={() => navigate(-1)}
    />
  );
}

export default Unauthorized;
