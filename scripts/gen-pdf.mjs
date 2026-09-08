import fs from "fs";

const objects = [];
objects.push("<< /Type /Catalog /Pages 2 0 R >>");
objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>");
objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

const text =
  "BT /F1 30 Tf 60 770 Td (BLACK-MAK) Tj 0 -40 Td /F1 14 Tf (Portfolio - Logo & Visual Identity Design) Tj 0 -28 Td (Muhamed Alaa Elbank) Tj 0 -22 Td (Behance: behance.net/Muhmed-alaa-el-bank) Tj 0 -22 Td (Phone: +20 100 246 2821) Tj 0 -22 Td (Email: makeenmuhamed31@gmail.com) Tj ET";

objects.push(`<< /Length ${text.length} >>\nstream\n${text}\nendstream`);

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((o) => {
  pdf += String(o).padStart(10, "0") + " 00000 n \n";
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

fs.writeFileSync("public/portfolio.pdf", pdf, "latin1");
console.log("portfolio.pdf written:", pdf.length, "bytes");
