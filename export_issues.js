const { exec } = require("child_process");
const fs = require("fs");

const csvFile = "github_issues.csv";

function fetchIssues() {
    return new Promise((resolve, reject) => {
        exec(
            `gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" /issues`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error("Erro ao executar o comando:", error.message);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.error("Erro na saída:", stderr);
                }
                try {
                    const issues = JSON.parse(stdout);
                    resolve(issues);
                } catch (parseError) {
                    console.error("Erro ao parsear JSON:", parseError.message);
                    reject(parseError);
                }
            }
        );
    });
}

function cleanText(text) {
    if (!text) return "";
    text = text.toString().trim();
    if (text.includes(",") || text.includes("\n") || text.includes('"')) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
}

async function exportToCsv() {
    try {
        const issues = await fetchIssues();

        const header = "title,description,due_date,milestone\n";

        const records = issues.map((issue) => {
            const title = cleanText(issue.title);
            const description = cleanText(issue.body || "");
            const due_date = "";
            const milestone = issue.milestone ? cleanText(issue.milestone.title) : "";

            return `${title},${description},${due_date},${milestone}`;
        });

        const csvContent = header + records.join("\n");

        fs.writeFileSync(csvFile, csvContent, "utf8");

        console.log(`CSV exportado com sucesso: ${csvFile}`);
    } catch (error) {
        console.error("Falha ao exportar issues:", error.message);
    }
}

exportToCsv();
