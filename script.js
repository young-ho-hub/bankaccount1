function generateStatement() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const accountNumber = document.getElementById('account-number').value.trim();
  const password = document.getElementById('password').value.trim();

  const validAccounts = {
    "110-123-456789": "shinhan123",
    "110-987-654321": "pass4321"
  };

  if (!validAccounts[accountNumber] || validAccounts[accountNumber] !== password) {
    alert("계좌번호 또는 비밀번호가 올바르지 않습니다.");
    return;
  }

  const transactions = [
    { date: "2025-06-01", desc: "급여 입금", amount: "+₩3,000,000" },
    { date: "2025-06-03", desc: "스타벅스", amount: "-₩6,800" },
    { date: "2025-06-05", desc: "카카오페이 송금", amount: "-₩50,000" },
    { date: "2025-06-07", desc: "이자", amount: "+₩1,100" }
  ];

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Shinhan Bank - Account Statement", 10, 20);

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.text(`Account: ${accountNumber}`, 10, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 40);
  doc.text("--------------------------------------------------", 10, 45);
  doc.text("Date        Description              Amount", 10, 55);

  let y = 65;
  transactions.forEach(tx => {
    doc.text(`${tx.date}   ${tx.desc.padEnd(20)}   ${tx.amount}`, 10, y);
    y += 10;
  });

  doc.save(`shinhan-statement-${accountNumber}.pdf`);
}
