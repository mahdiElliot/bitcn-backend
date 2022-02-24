import pandas as pd
import sys

name = sys.argv[1]
start = sys.argv[2]
end = sys.argv[3]

df = pd.read_csv(name)

df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
if int(end) == 0:
    df = df.iloc[0:9000]
else:
    df = df[(df['unix'] >= int(start))]
    df = df[(df['unix'] <= int(end))]
    if df.shape[0] >= 9000:
        df = df.iloc[0:9000]
df.to_csv('docs/proper-data.csv')
print(' ')
# x = df.to_json(orient='records')
