import fileinput
import numpy as np

def main():
  stdin = [line.rstrip() for line in fileinput.input()]

  input = np.array(stdin, dtype='int32')
  fuel = input / 3 - 2
  result = np.sum(fuel)

  print('%i' % result)

if __name__ == '__main__':
  main()