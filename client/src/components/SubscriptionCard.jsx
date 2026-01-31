export default function SubscriptionCard({ sub, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h2 className="font-medium">{sub.name}</h2>
        <p className="text-sm text-gray-500">
          ₹{sub.amount} • Renews on{" "}
          {new Date(sub.renewalDate).toDateString()}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="text-red-500 text-sm"
      >
        Delete
      </button>
    </div>
  );
}
