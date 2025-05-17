import Link from "next/link";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export default function BlogCard({
  post,
  isRead,
}: {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    growthArea: string;
    created_at: string;
  };
  isRead: boolean;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition relative">
      <div className="flex justify-between">
        <Link href={`/blog/${post.slug}`}>
          {" "}
          <h2 className="text-2xl font-semibold text-blue-800 mb-2 hover:underline">
            {post.title}
          </h2>
        </Link>

        <p className="font-bold">{post.growthArea.replace("-", " ")}</p>
      </div>

      <p className="text-gray-700 mb-3">{post.excerpt}</p>

      <p className="text-sm text-gray-500">
        🗓️ {formatDate(new Date(post.created_at).toLocaleDateString())}
      </p>
      {/* Read status badge */}
      <div className="absolute bottom-4 right-4 text-xs font-semibold">
        <span
          className={`px-2 py-0.5 rounded-full ${
            isRead ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isRead ? "Read" : "Unread"}
        </span>
      </div>
    </div>
  );
}
