"use client";

import { useMemo, useState } from "react";

type Props = {
  propertyTitle: string;
  propertyPrice: string;
};

function parsePrice(price: string) {
  const numeric = price.replace(/[^\d]/g, "");
  return Number(numeric || 0);
}

function formatBDT(value: number) {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export default function EmiCalculator({
  propertyTitle,
  propertyPrice,
}: Props) {
  const basePrice = parsePrice(propertyPrice);

  const [price, setPrice] = useState(basePrice);
  const [downPayment, setDownPayment] = useState(Math.round(basePrice * 0.2));
  const [interestRate, setInterestRate] = useState(9);
  const [loanYears, setLoanYears] = useState(20);

  const result = useMemo(() => {
    const principal = Math.max(price - downPayment, 0);
    const months = loanYears * 12;
    const monthlyRate = interestRate / 100 / 12;

    if (principal <= 0 || months <= 0) {
      return {
        loanAmount: 0,
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    let emi = 0;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      loanAmount: principal,
      emi,
      totalPayment,
      totalInterest,
    };
  }, [price, downPayment, interestRate, loanYears]);

  return (
    <div
      style={{
        marginTop: "36px",
        background: "#ffffff",
        padding: "24px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          margin: "0 0 10px 0",
          color: "#555",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        EMI Calculator
      </h2>

      <p
        style={{
          margin: "0 0 20px 0",
          color: "#777",
          fontSize: "15px",
          lineHeight: "1.7",
        }}
      >
        Estimate the monthly installment for <strong>{propertyTitle}</strong>.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#555",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Property Price (BDT)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#555",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Down Payment (BDT)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#555",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#555",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Loan Term (Years)
          </label>
          <input
            type="number"
            value={loanYears}
            onChange={(e) => setLoanYears(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            background: "#f8f8f8",
            padding: "18px",
            borderLeft: "4px solid #ef4444",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#777", fontSize: "14px" }}>
            Loan Amount
          </p>
          <h3 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
            BDT {formatBDT(result.loanAmount)}
          </h3>
        </div>

        <div
          style={{
            background: "#f8f8f8",
            padding: "18px",
            borderLeft: "4px solid #ef4444",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#777", fontSize: "14px" }}>
            Monthly EMI
          </p>
          <h3 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
            BDT {formatBDT(result.emi)}
          </h3>
        </div>

        <div
          style={{
            background: "#f8f8f8",
            padding: "18px",
            borderLeft: "4px solid #ef4444",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#777", fontSize: "14px" }}>
            Total Payment
          </p>
          <h3 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
            BDT {formatBDT(result.totalPayment)}
          </h3>
        </div>

        <div
          style={{
            background: "#f8f8f8",
            padding: "18px",
            borderLeft: "4px solid #ef4444",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#777", fontSize: "14px" }}>
            Total Interest
          </p>
          <h3 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
            BDT {formatBDT(result.totalInterest)}
          </h3>
        </div>
      </div>
    </div>
  );
}