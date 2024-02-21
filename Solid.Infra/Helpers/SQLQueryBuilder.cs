using System.Text;

namespace Solid.Infra.Helpers
{
    public class SQLQueryBuilder
    {
        private readonly StringBuilder sqlString;
        private byte conditionCounter;

        public SQLQueryBuilder(string header)
        {
            sqlString = new StringBuilder(header);
        }
        public override string ToString()
        {
            return sqlString.ToString();
        }

        public void AddCondition(string parametro)
        {
            Append(conditionCounter > 0 ? " AND " : " WHERE ");

            conditionCounter++;
            Append(parametro);
        }

        public void AddDeclare(string declare) => InsertInit($" DECLARE {declare} ");
        public void InsertInit(string value) => sqlString.Insert(0, value);
        public void Append(string value) => sqlString.Append($" {value} ");
    }
}
