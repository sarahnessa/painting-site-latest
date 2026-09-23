// Dormant UI skeleton. Not imported by the current app.
export default function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate fields and call the sign-in action from useAuth().
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Log in">
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="min-h-11 w-full rounded-xl border border-border bg-surface px-4 text-ink outline-none focus-visible:ring-2 focus-visible:ring-citrus"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Your password"
          className="min-h-11 w-full rounded-xl border border-border bg-surface px-4 text-ink outline-none focus-visible:ring-2 focus-visible:ring-citrus"
        />
      </div>

      <p className="text-sm text-muted" role="status">
        Authentication is not connected yet.
      </p>

      <button
        type="submit"
        className="min-h-11 w-full rounded-full bg-citrus px-5 font-medium text-ink transition-colors hover:bg-citrus-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Log in
      </button>
    </form>
  );
}
