"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Book() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    sport: "Football",
    turf: "Turf 1",
    booking_date: "",
    start_time: "",
    end_time: "",
    bkash_txn: ""
  });

  const getPrice = (time) => {
    const hour = parseInt(time.split(":")[0]);
    return hour >= 17 ? 4000 : 3000;
  };

  const submit = async () => {
    const total = getPrice(form.start_time);

    await supabase.from("bookings").insert({
      ...form,
      total_amount: total,
      advance_amount: 1000,
      due_amount: total - 1000,
      payment_status: "pending",
      booking_status: "pending"
    });

    alert("Booking submitted!");
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>Book Turf</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, customer_name: e.target.value })} />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />

      <input type="date" onChange={e => setForm({ ...form, booking_date: e.target.value })} />
      <input type="time" onChange={e => setForm({ ...form, start_time: e.target.value })} />
      <input type="time" onChange={e => setForm({ ...form, end_time: e.target.value })} />

      <input placeholder="bKash Txn ID" onChange={e => setForm({ ...form, bkash_txn: e.target.value })} />

      <button onClick={submit}>Confirm Booking (৳1000 Advance)</button>
    </main>
  );
}