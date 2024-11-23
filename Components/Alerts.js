const Alerts = ({ isConnected }) => (
  <div className="alerts">
    {isConnected ? (
      <p className="success">WebSocket connected</p>
    ) : (
      <p className="error">WebSocket connection lost</p>
    )}
  </div>
);
export default Alerts;
