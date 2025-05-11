import Header from "../components/Header";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-100 text-gray-800 p-6">
      <Header />

      <section className="w-full max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md">
        <textarea
          placeholder="Type your thought here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
          Submit Thought
        </button>
      </section>

      <section className="w-full max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Recent Thoughts
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-md shadow">
            <p className="text-gray-800">
              "I feel stuck in the same loop every week."
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Echo: "Loops often mean there’s something unresolved. What haven’t
              you looked at yet?"
            </p>
          </div>
          <div className="p-4 bg-white rounded-md shadow">
            <p className="text-gray-800">
              "Sometimes I wish I could disappear just to see if anyone
              notices."
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Echo: "To be unseen can feel safe — but also lonely. Who do you
              wish saw you, truly?"
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
