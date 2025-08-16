import React, { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../api";

const MIN_USD = 5;
const MAX_USD = 2000;
const FEES = { GBP: 0.1, ZAR: 0.2 };

function ceilToCents(amountFloat) {
  const cents = Math.ceil(amountFloat * 100 - 1e-9);
  return cents;
}

export default function SendMoneyForm() {
  const [rates, setRates] = useState(null);
  const [currency, setCurrency] = useState("GBP");
  const [amount, setAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [note, setNote] = useState("");
  const [calc, setCalc] = useState(null);
  const [busy, setBusy] = useState(false);
  const [alert, setAlert] = useState(null);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    (async () => {
      const rates = await apiGet("/rates");
      console.log(rates);
      setRates(rates);
    })();
  }, []);

  const compute = useMemo(() => {
    return (amtStr, curr) => {
      if (!rates) return null;
      const amt = Number(amtStr);
      if (!Number.isFinite(amt) || amt <= 0) return null;

      const feePct = FEES[curr] ?? 0;
      const feeUSD_cents = ceilToCents(amt * feePct);
      const amountUSD_cents = ceilToCents(amt);

      const netUSD_cents = Math.max(0, amountUSD_cents - feeUSD_cents);

      const rate = rates[curr];

      const recipientMinor = Math.ceil(
        (netUSD_cents / 100) * rate * 100 - 1e-9
      );

      return {
        feeUSD_cents,
        amountUSD_cents,
        netUSD_cents,
        fxRate: rate,
        recipientMinor,
      };
    };
  }, [rates]);

  useEffect(() => {
    setCalc(compute ? compute(amount || 0, currency) : null);
  }, [amount, currency, compute]);

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);
    console.log("clicked")
    if (!amount || Number(amount) <= 0) {
      setAlert({ type: "error", msg: "Amount is required" });
      setTimeout(() => setAlert(null), 4000);
      return;
    }
    if (!calc) {
      setAlert({ type: "error", msg: "Enter a valid amount" });
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      return;
    }
    if (!recipientName.trim()) {
      setAlert({ type: "error", msg: "Recipient name is required" });
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      return;
    }
    const usd = calc.amountUSD_cents / 100;
    if (usd < MIN_USD) {
      setAlert({ type: "error", msg: `Minimum is $${MIN_USD.toFixed(2)}` });
      setAmountError(true)
      setTimeout(() => {
        setAlert(null);
        setAmountError(true)
      }, 4000);
      return;
    }
    if (usd > MAX_USD) {
      setAlert({ type: "error", msg: `Maximum is $${MAX_USD.toFixed(2)}` });
      setAmountError(true)
      setTimeout(() => {
        setAlert(null);
        setAmountError(true)
      }, 4000);
      return;
    }

    setBusy(true);
    try {
      const resp = await apiPost("/transactions", {
        recipientName,
        note,
        currency,
        amountUSD_cents: calc.amountUSD_cents,
      });
      setAlert({ type: "success", msg: "Transfer created!" });
      setTimeout(() => {
        setAlert(null);
      }, 7000);
      setAmount("");
      setRecipientName("");
      setNote("");
    } catch (e) {
      setAlert({
        type: "error",
        msg: e.message || "Failed to create transaction",
      });
      setTimeout(() => {
        setAlert(null);
      }, 4000);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card" role="region" aria-label="Send money">
      <h3>Send money</h3>
      <form onSubmit={submit} className="row">
        <div
          className={`col input_container ${amountError ? "input_error" : ""}`}
        >
          <label>Amount (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => {
              if (isNaN(amount)) {
                setAmountError(true);
                setAmount("");
                setTimeout(() => {
                  setAmountError(false);
                }, 2000);
              }
              setAmount(e.target.value);
            }}
            placeholder="e.g. 100"
            aria-describedby="amt-help"
          />
          <div id="amt-help" className="helper">
            Min ${MIN_USD} — Max ${MAX_USD}. Values round up to nearest cent.
          </div>
        </div>

        {rates && calc && (
          <div className="col input_container">
            <div className="helper">
              FX Rate (USD→{currency}): {calc.fxRate}
            </div>
            <div className="helper">
              Fee (USD): ${(calc.feeUSD_cents / 100).toFixed(2)}
            </div>
            <div className="helper">
              Recipient gets:{" "}
              {currency === "GBP"
                ? `£${(calc.recipientMinor / 100).toFixed(2)}`
                : `R ${(calc.recipientMinor / 100).toFixed(2)}`}
            </div>
          </div>
        )}
        <div className="col input_container">
          <label>Destination</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="GBP">United Kingdom (GBP)</option>
            <option value="ZAR">South Africa (ZAR)</option>
          </select>
          <div className="helper">
            Fee: {currency === "GBP" ? "10%" : "20%"}
          </div>
        </div>
        <div className="col input_container">
          <label>Recipient name</label>
          <input
            value={recipientName}
            placeholder="Enter recepient's full name"
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />
        </div>
        <div className="col input_container">
          <label>Note (optional)</label>
          <textarea
            value={note}
            placeholder="Enter note"
            onChange={(e) => setNote(e.target.value)}
            maxLength={120}
          ></textarea>
        </div>

        <div className="col">
          <button type="submit" className={`${busy || !calc ? "btn_disabled": ""} btn`} disabled={busy || !calc}>
            {busy ? "Sending..." : "Send"}
          </button>
          {!rates && <div className="helper">Fetching FX rates…</div>}
        </div>
        {alert && (
          <div className={alert.type === "error" ? "error" : "success"}>
            {alert.msg}
          </div>
        )}
      </form>
    </div>
  );
}
