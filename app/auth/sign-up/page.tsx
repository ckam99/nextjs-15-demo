

export default function Page() {
  return (
    <form className="p-8">
      <div className="text-4xl pb-6">Sign up</div>
      <input
        type="text"
        placeholder="Full name"
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="Username"
        className="border p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
      />
      <button
        type="submit"
        className="bg-teal-600 text-white p-2 rounded w-full"
      >
        Sign Up
      </button>
    </form>
  );
}
