use std::io::{self, Read};

fn main() -> io::Result<()> {
  let mut input = String::new();
  let stdin = io::stdin();
  let mut handle = stdin.lock();

  handle.read_to_string(&mut input)?;

  let mut list: Vec<usize> = input
    .split(",")
    .map(|x| x.parse::<usize>().unwrap())
    .collect();
  
  list[1] = 12usize;
  list[2] = 2usize;
  
  for i in (0..list.len()).step_by(4) {
    let op = list[i];
    if op == 99usize {
      break;
    }

    let j = list[i + 1usize];
    let k = list[i + 2usize];
    let l = list[i + 3usize];

    let lhs = list[j];
    let rhs = list[k];

    if list[i] == 1usize {
      list[l] = lhs + rhs;
    } else if list[i] == 2usize {
      list[l] = lhs * rhs;
    }
  }

  println!("{}", list[0]);

  Ok(())
}
