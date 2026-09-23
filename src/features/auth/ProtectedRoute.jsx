// Dormant route-guard skeleton. Not imported by the current app, and it does
// not depend on a router package until routing is added intentionally.
export default function ProtectedRoute({ children }) {
  // TODO: read auth status from useAuth() and location from React Router.
  const status = "loading";

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center text-muted" role="status">
        Checking your session…
      </div>
    );
  }

  // TODO: render <Navigate to="/login" replace state={{ from: location }} />
  // when unauthenticated; render the protected route only after auth resolves.
  return children ?? null;
}
