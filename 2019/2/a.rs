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
  
  let mut i = 0usize;
  loop {
    let mut pos;
    let op = list[i];
    match op {
      1 => {
        pos = list[i + 1usize];
        let lhs = list[pos];
        pos = list[i + 2usize];
        let rhs = list[pos];
        pos = list[i + 3usize];
        list[pos] = lhs + rhs;
        i += 4;
      },
      2 => {
        pos = list[i + 1usize];
        let lhs = list[pos];
        pos = list[i + 2usize];
        let rhs = list[pos];
        pos = list[i + 3usize];
        list[pos] = lhs * rhs;
        i += 4;
      },
      99 => break,
      _ => panic!("Something went wrong!"),
    }
  }

  println!("{}", list[0]);

  Ok(())
}
