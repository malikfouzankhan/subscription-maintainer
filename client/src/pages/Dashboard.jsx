import { useEffect, useState } from "react";
import {
  getSubscriptions,
  createSubscription,
  deleteSubscription
} from "../api/subscriptionApi";
import SubscriptionCard from "../components/SubscriptionCard";

export default function Dashboard() {
  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    renewalDate: ""
  });

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    const res = await getSubscriptions();
    setSubs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubscription(form);
    setForm({ name: "", amount: "", renewalDate: "" });
    fetchSubs();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Subscription Reminders
        </h1>

        {/* Add Subscription */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow mb-6"
        >
          <input
            placeholder="Subscription name"
            className="w-full mb-3 p-2 border rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="Amount"
            type="number"
            className="w-full mb-3 p-2 border rounded"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />
          <input
            type="date"
            className="w-full mb-3 p-2 border rounded"
            value={form.renewalDate}
            onChange={(e) =>
              setForm({ ...form, renewalDate: e.target.value })
            }
          />
          <button className="w-full bg-black text-white py-2 rounded">
            Add Subscription
          </button>
        </form>

        {/* List */}
        <div className="space-y-3">
          {subs.map((sub) => (
            <SubscriptionCard
              key={sub._id}
              sub={sub}
              onDelete={async () => {
                await deleteSubscription(sub._id);
                fetchSubs();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
