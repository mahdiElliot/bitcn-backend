import pandas as pd
import sys

name = sys.argv[1]
start = sys.argv[2]
end = sys.argv[3]

df = pd.read_csv(name)

df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
df = df.iloc[int(start):int(end)]
print(df.to_json(orient='records'))
sys.stdout.flush()