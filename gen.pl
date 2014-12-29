#! perl -w

use 5.012;
use warnings;
use strict;
use Cwd qw/getcwd/;

my $target_dir = 'e:/Projects/heroman/Resources/commercial/db';
my $test_dir = './outputs';

die if not -d $target_dir;
mkdir $test_dir;
die if not -d $test_dir;

sub writeOuts{
	my $in = shift // die "No inputs";
	my $out_d = shift // die "No output directory";
	my $cmd = "node \"js/$in.js\" > \"$out_d/$in.lua\"";
	system($cmd);
	die "Error running $cmd" if $?;
}

sub main{
	my @arr = qw/hero word battleforce global skill battle/;
	for my$a(@arr){
		writeOuts $a, $target_dir;
		writeOuts $a, $test_dir;
	}
}


print 'Working under ', getcwd(), "\n";
main;
print 'done';

