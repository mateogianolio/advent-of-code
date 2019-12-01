import fileinput
import numpy as np

def main():
  stdin = [line.rstrip() for line in fileinput.input()]

  input = np.array(stdin, dtype='int32')
  fuel = input

  for i, value in enumerate(fuel):
    fuel[i] = 0
    rest = value / 3 - 2
    while rest > 0:
      fuel[i] += rest
      rest = rest / 3 - 2

  result = np.sum(fuel)

  print('%i' % result)

if __name__ == '__main__':
  main()